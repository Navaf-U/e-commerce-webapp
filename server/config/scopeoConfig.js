import {configManager} from "scopeo";
export const scopeoConfig = () => {
  try {
    configManager.setConfig({
      apiKey: process.env.API_KEY,
      passKey: process.env.PASS_KEY,
      environment: process.env.ENVIRONMENT,
    });
  } catch (error) {
    console.log(error,"from scopeo package");
  }
};
