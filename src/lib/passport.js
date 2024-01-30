const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const orm = require('../Database/dataBase.orm');
const sql = require('../Database/dataBase.sql');
const helpers = require('./helpers');
const { cifrarDatos } = require('./encrypDates');

passport.use(
    'local.signin',
    new LocalStrategy(
        {
            usernameField: 'correo_gerente',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, correo_gerente, password, done) => {
            try {
                const user = await orm.client.findOne({ where: { correo_gerenteClient: correo_gerente, stateClient: 'activado' } });

                if (user) {
                    const validPassword = await helpers.comparePassword(password, user.passwordClient);

                    if (validPassword) {
                        return done(null, user, req.flash('message', `Bienvenido ${user.correo_gerenteClient}`));
                    } else {
                        return done(null, false, req.flash('message', 'Datos incorrectos'));
                    }
                } else {
                    return done(null, false, req.flash('message', 'El nombre de gerente no existe.'));
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    'local.signup',
    new LocalStrategy(
        {
            usernameField: 'correo_gerente',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, correo_gerente, password, done) => {
            try {
                const existingUser = await orm.client.findOne({ where: { correo_gerenteClient: correo_gerente } });

                if (existingUser) {
                    return done(null, false, req.flash('message', 'El nombre de gerente ya existe.'));
                }

                const hashedPassword = await helpers.hashPassword(password);

                const {
                    idUsuarios,
                    nameClient,
                    lastNameClient,
                    typeIdentificationClient,
                    identificationCardClient,
                    emailClient,
                    phoneClient,
                    nameTypePerson,
                    nameGener,
                } = req.body;

                let newClient = {
                    idClient: idUsuarios,
                    nameClient: cifrarDatos(nameClient),
                    lastNameClient: cifrarDatos(lastNameClient),
                    typeIdentificationClient: cifrarDatos(typeIdentificationClient),
                    identificationCardClient: cifrarDatos(identificationCardClient),
                    emailClient: cifrarDatos(emailClient),
                    phoneClient: cifrarDatos(phoneClient),
                    correo_gerenteClient: correo_gerente,
                    passwordClient: hashedPassword,
                    stateClient: 'activado',
                };

                if (nameClient !== 'seleccion' && nameTypePerson !== 'seleccion') {
                    let newDetail = {
                        clientIdClient: idUsuarios,
                        generIdGener: nameGener,
                        typePersonIdTypePerson: nameTypePerson,
                    };

                    const resultado = await orm.client.create(newClient);
                    await orm.clientDetail.create(newDetail);

                    newClient.id = resultado.insertId;
                } else {
                    req.flash('message', 'Llene todos los campos por favor.');
                    return done(null, false);
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;