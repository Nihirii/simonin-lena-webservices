import authService from "#src/services/authService";
import devsService from "#src/services/devsService";
import { signJwt, verifyJwt } from "#src/utils/jwtoken";

const exposeController = {
  login: async (req, res) => {
    const { body } = req;
    const dev = await devsService.findOneDevByEmail(body);

    if (!dev) return res.sendStatus(401);
    const comparePwd = await authService.comparePassword({
      password: body.password,
      storedPassword: dev.password,
    });
    const tokenPayload = {
      lastName: dev.lastName,
      firstName: dev.firstName,
      email: dev.email,
      skills: dev.skills,
    };
    if (comparePwd) {
      const token = signJwt({ payload: tokenPayload, expiresIn: "5min" });
      const refreshToken = signJwt({ payload: tokenPayload, expiresIn: "7d" });
      const accessToken = { access_token: token, token_type: "Bearer" };
      const updateRefresh = await devsService.updateDevToken({
        devId: dev._id,
        refreshToken,
      });
      return res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .json(accessToken);
    }
    return res.sendStatus(401);
  },
  refreshToken: async (req, res) => {
    const { cookies } = req;
    if (!cookies?.refreshToken) return res.sendStatus(401);
    const refreshToken = cookies.refreshToken;
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    // is refreshToken still valid on our side?

    const foundDev = await devsService.findDevByRefreshToken({ refreshToken });
    if (!foundDev) return res.sendStatus(403);
    try {
      const decoded = verifyJwt(refreshToken);
      const tokenPayload = {
        lastName: foundDev.lastName,
        firstName: foundDev.firstName,
        email: foundDev.email,
        skills: foundDev.skills,
      };
      if (decoded.email !== foundDev.email) return res.sendStatus(403);
      const accessToken = signJwt({ payload: tokenPayload, expiresIn: "1d" });
      return res.json({ accessToken, token_type: "Bearer" });
    } catch (error) {
      console.log(error);
      return res.sendStatus(401); // expired refresh token
    }
  },
};

export default exposeController;
