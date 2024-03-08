import Dev from "#src/models/Skills";

const skillsService = {
  addSkillToDev: async ({ devId, skillId }) => {
    try {
      const dev = await Dev.findById(devId);
      if (!dev) {
        throw new Error("Développeur non trouvé");
      }

      dev.skills.push(skillId);

      const updatedDev = await dev.save();
      return updatedDev;
    } catch (error) {
      throw error;
    }
  },

  removeSkillFromDev: async ({ devId, skillId }) => {
    try {
      const dev = await Dev.findById(devId);
      if (!dev) {
        throw new Error("Développeur non trouvé");
      }

      dev.skills = dev.skills.filter((s) => s.toString() !== skillId);

      const updatedDev = await dev.save();
      return updatedDev;
    } catch (error) {
      throw error;
    }
  },

  updateDevSkills: async ({ devId, skills }) => {
    try {
      const dev = await Dev.findById(devId);
      if (!dev) {
        throw new Error("Développeur non trouvé");
      }

      dev.skills = skills;

      const updatedDev = await dev.save();
      return updatedDev;
    } catch (error) {
      throw error;
    }
  },

  getDevSkills: async (devId) => {
    try {
      const dev = await Dev.findById(devId).populate("skills");
      if (!dev) {
        throw new Error("Développeur non trouvé");
      }

      return dev.skills;
    } catch (error) {
      throw error;
    }
  },
};

export default skillsService;
