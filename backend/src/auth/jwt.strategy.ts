import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import authConfig from "config/auth.config";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConfig().secret,
        });
    }

    async validate(payload: { username: string, sub: string }) {
        return { username: payload.username, uuid: payload.sub };
    }
}