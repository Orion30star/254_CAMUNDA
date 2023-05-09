import axios from "axios";

const BACKEND_BASE_URL = "http://localhost:8080/engine-rest";

export const startServiceTask = (config) => {
  axios
    .post(`${BACKEND_BASE_URL}/external-task/fetchAndLock`, {
      body: JSON.stringify(config),
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const completeServiceTask = (serviceTaskID) => {
  axios
    .post(`${BACKEND_BASE_URL}/external-task/${serviceTaskID}/complete`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getProcessInstanceList = () => {
  axios
    .get(`${BACKEND_BASE_URL}/process-instance`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserTasks = () => {
  axios
    .get(`${BACKEND_BASE_URL}/task`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getProcessDefinitionList = () => {
  axios
    .get(`${BACKEND_BASE_URL}/process-definition`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const startProcess = () => {
  axios
    .post(`${BACKEND_BASE_URL}/process-definition/key/Process_1d7qf51/start`, {
      businessKey: "startAnzeige",
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const correlateMessage = (messageName) => {
  axios
    .post(`${BACKEND_BASE_URL}/process-definition/key/Anzeige/start`, {
      messageName: messageName,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};