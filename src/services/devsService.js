import Dev from "#src/models/Devs";
import bcrypt from "bcryptjs";

const exposeServices = {
  findOneDevByEmail: async ({ email }) => {
    try {
      const findDev = await Dev.findOne({ email });
      return findDev;
    } catch (error) {
      throw error;
    }
  },
  findDevByRefreshToken: async ({ refreshToken }) => {
    try {
      const findDev = await Dev.findOne({ refreshToken });
      return findDev;
    } catch (error) {
      throw error;
    }
  },
  findAllDevs: async () => {
    try {
      const allDevs = await Dev.find();
      return allDevs;
    } catch (error) {
      throw error;
    }
  },
  createDev: async (rawData) => {
    const { password } = rawData;
    const salt = bcrypt.genSaltSync(4);
    const hash = bcrypt.hashSync(password, salt);

    const newDevData = {
      ...rawData,
      password: hash,
    };

    try {
      const toSave = new Dev(newDevData);
      const newDev = await toSave.save(); // Attendre la sauvegarde du nouvel utilisateur
      return newDev;
    } catch (error) {
      throw error;
    }
  },

  updateDevToken: async ({ devId, refreshToken }) => {
    const query = {
      _id: devId,
    };
    const updateQ = {
      $set: {
        refreshToken,
      },
    };
    try {
      const toUpdate = await Dev.findOneAndUpdate(query, updateQ, {
        new: true,
      });
      return toUpdate;
    } catch (error) {
      throw error;
    }
  },
};

export default exposeServices;
