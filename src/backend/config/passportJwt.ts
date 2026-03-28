import {
  Strategy as JWTStrategy,
  ExtractJwt,
  type StrategyOptionsWithoutRequest,
} from "passport-jwt";
import type { PassportStatic } from "passport";
import { prisma } from "../lib/prisma.js";

interface Payload {
  id: string;
  iat: string;
}

const opts: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: `${process.env.ACCESS_TOKEN_KEY}`,
};

export default (passport: PassportStatic) => {
  passport.use(
    new JWTStrategy(opts, async (payload: Payload, done) => {
      try {
        const user = await prisma.users.findUnique({
          where: {
            id: Number(payload.id),
          },
        });

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        console.error(error);
      }
    }),
  );
};
