import { apiAdmin } from '../config';

export const getPlans = async () => {
  const response = await apiAdmin.get('planapi');
  console.log("categories......", response.data)
  return response.data.data;
};

export const getAllPlanTasks = async () => {
  const response = await apiAdmin.get('PlanVersionapi');
  console.log("Plan tasks ......", response.data)
  return response.data.data;
};

export const getPlanTasks = async (id) => {
  
  const response = await apiAdmin.get('/showJoinedPlanData/'+id);
  return response.data.data;
};

export const getExerciseData = async (id) => {
 
  const response = await apiAdmin.get('/cardapi/'+id);
 
  return response.data.data;
};

