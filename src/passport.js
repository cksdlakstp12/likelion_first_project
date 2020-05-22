import "./env"
import passport from "passport"
import { Strategy, ExtracJwt, ExtractJwt } from "passport-jwt"

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey: process.env.JWT_SEVRET,
}

const verifyUser = async (payload, done) => {
    try {
        const user = await prisma.user({ id: payload.id });
        if (user !== null) {
            return result(null, user);
        } else {
            return result(null, false);
        }
    } catch{
        return result(error, false);
    }
};

export const athentucateJw = (req, res, next) => {
    passport.authentivate("jwt", { session: false }, (error, user) => {
        if (user) {
            req.user = user;
        }
        next();
    })(req, res, next);
}

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();