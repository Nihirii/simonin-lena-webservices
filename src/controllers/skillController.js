import devsService from "#src/services/devsService";

const exposeController = {
  allSkill: async (req, res) => {
    try {
      const allSkill = await devsService.findAllSkill();
      return res.json(allSkill);
    } catch (error) {
      return res.sendStatus(500); // Erreur interne du serveur
    }
  },
  createSkill: async (req, res) => {
    const { body } = req;
    try {
      const registeredDev = await devsService.createSkill(body);
      return res.json(registeredDev);
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  },
  updateSkill: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const updatedSkill = await devsService.updateSkill(id, body);
      return res.json(updatedSkill);
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  },
};

export default exposeController;
