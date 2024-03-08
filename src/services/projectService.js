import Project from "#src/models/Projects";
import queryBuilder from "#src/utils/mongoQueryBuilder";

const exposeServices = {
  findOneProject: async ({ id: _id }) => {
    try {
      const oneCrea = await Project.findOne({ _id });
      return oneCrea;
    } catch (error) {
      throw new Error(error);
    }
  },
  findAllProjects: async (query) => {
    // là ici je vais manipuler ma query
    // pour en faire un objet mongod
    // query {categories:'ynov'}
    const { filter, projection, options } = queryBuilder.getFindOptions({
      query,
    });

    try {
      const allCrea = await Project.find(filter, projection, options);
      return allCrea;
    } catch (error) {
      throw new Error(error);
    }
  },
  createProjects: async (rawData) => {
    try {
      const creaToSave = new Project(rawData);
      const newCrea = creaToSave.save();
      return newCrea;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateProject: async ({ id, body }) => {
    try {
      const updatedCrea = await Project.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });
      return updatedCrea;
    } catch (error) {
      throw new Error(error);
    }
  },
  patchProject: async ({ id, body }) => {
    //TODO: rendre dynamique l'attribution du addToSet
    const { categories = false, ...rest } = body;
    const updateQ = {
      $addToSet: {
        categories: {
          $each: categories,
        },
      },
      ...rest,
    };
    try {
      const patchCrea = await Project.findOneAndUpdate({ _id: id }, updateQ, {
        new: true,
      });
      return patchCrea;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default exposeServices;
