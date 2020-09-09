const express = require('express');
const router = express.Router();
const User = require('../models/user')
const passport = require('passport');
const passportConfig = require('../passport');
const {OAuth2Client} = require('google-auth-library')
const JWT = require('jsonwebtoken');
const frontEndRedirect = process.env.FRONT_END_URL || "http://localhost:3000"
const responseFormatter = require('../formatters/response')
const client = new OAuth2Client('4FSVEIOf2F-zd5ebP_qtC5py')
const googleClient = process.env.GOOGLE_CLIENT_ID

const secretKey = process.env.SECRET_KEY

const signToken = userID => {
    console.log('userID is' + userID)
    return JWT.sign({
        iss: secretKey,
        sub: userID
    }, secretKey, { expiresIn: "1h" })
}


const googlesignToken = userID => {
    console.log('userID is' + userID)
    return JWT.sign({
        iss: secretKey,
        sub: userID._id
    }, secretKey, { expiresIn: "1h" })
}

//google auth 

router.get(
    '/google',
    passport.authenticate('google', {
        scope: [
            'profile'
        ]
    })
)

//google signup 

router.post('/googlelogin', (req, res) => {
    const {tokenId} = req.body
    client.verifyIdToken({idToken: tokenId, audience: googleClient}).then(response => {
        console.log(response)
        const {email_verified, given_name, family_name, email, picture, sub} = response.payload
        if(email_verified === true){
            User.findOne({googleId: sub}).exec((err, user) => {
                if(err){
                    console.log('first err' + err)
                    return res.status(400).json({
                        error: "Something went wrong..."
                    })
                } else {
                    if(user) {
                        console.log('2nd route')
                        const {_id, firstName, lastName, email, image} = user;
                        const token = googlesignToken(user._id);
                        res.cookie('access_token', token, { httpOnly: true });
                        res.status(200).json({ isAuthenticated: true, user: { email, _id, token, firstName, lastName, image } });
                    } else{
                        console.log('3rd route')

                         let newUser = new User({ email, 
                                                firstName: given_name,
                                                lastName: family_name,
                                                image: picture,
                                                googleId: sub
                        }); 
                        newUser.save((err,data) => {
                            if(err){
                                return res.status(400).json({
                                    error: 'something went wrong'
                                })
                            } 
                            const {_id, firstName, lastName, email, image} = newUser;

                        const token = googlesignToken(data._id);
                        res.cookie('access_token', token, { httpOnly: true });
                        res.status(200).json({ isAuthenticated: true, user: { email, _id, token, firstName, lastName, image } }); 
                        })

                    }
                }
            })
        }
    })


    
})



router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
       const userData = req.user;
       const jwt = googlesignToken(userData)
       const redirectURL = 'http://localhost:3000/saveToken/' + jwt
       res.redirect(redirectURL);

    }
)



//find all route
router.get('/', (req, res) => {
    User.find({}, (err, foundUser) => {
        res.json(foundUser);
    });
});

router.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { email, _id, firstName, lastName, image } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { email, _id, firstName, lastName, image } });
})

router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { email: "" }, success: true });
})
//find by email by id route 
router.get('/:userID', (req, res) => {
    User.findById(req.params.userID, (err, foundUser) => {
        if (err) {
            res.status(500).json({ message: { msgbody: err, msgError: true } })
        } else {
            foundUser.password = null;
            res.json(foundUser);
        }
    });
});

// User register 
router.post('/signup', (req, res) => {
    const { email, password, firstName, lastName } = req.body
    console.log('reqbody is' + req.body)
    User.findOne({ email }, (err, user) => {
        console.log('user is' + user)
        if (err) {
            responseFormatter.formatErrorResponse(res, err, "Error has occured!")
        } else if (user) {
            responseFormatter.formatErrorResponse(res, err, "Email is already taken!")
        } else {
            const newUser = new User({ email, password, firstName, lastName });
            console.log('new user is' + newUser)
            newUser.save(err => {
                console.log(err)
                if (err) {
                    responseFormatter.formatErrorResponse(res, err)
                } else {
                    res.status(201).json({ message: "Account successfully created" })
                }
            })
        }
    })
})

router.post(
    '/login',
    (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            console.log("err and user" + err, user)
            if (err) { //unknown server error 
                next(err)
            }
            if (!user) { //empty case
                res.status(400).json({ message: 'Invalid email or password' })
            }
            else req.logIn(user, { session: false }, err => {
                if (err) {
                    next(err) //for password? check later
                }
                const { _id, email, lastName, firstName, image } = req.user; //success case
                const token = signToken(_id);
                res.cookie('access_token', token, { httpOnly: true });
                res.status(200).json({ isAuthenticated: true, user: { email, _id, token, firstName, lastName, image } });
            }
            )
        })(req, res, next)
    }
);


module.exports = router;