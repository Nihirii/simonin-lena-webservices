import devsService from "#src/services/devsService";

const exposeController = {
  allDevs: async (req, res) => {
    try {
      const allDevs = await devsService.findAllDevs();
      return res.json(allDevs);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  createDev: async (req, res) => {
    const { body } = req;
    try {
      const registeredDev = await devsService.createDev(body);
      return res.json(registeredDev);
    } catch (error) {
      return res.status(400).json({ error: "Bad request" });
    }
  },
  deleteDev: async (req, res) => {
    const { id } = req.params;
    try {
      await devsService.deleteDev(id);
      return res.json({ message: "Dev deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  updateDev: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const updatedDev = await devsService.updateDev(id, body);
      return res.json(updatedDev);
    } catch (error) {
      return res.status(400).json({ error: "Bad request" });
    }
  },
};

export default exposeController;
