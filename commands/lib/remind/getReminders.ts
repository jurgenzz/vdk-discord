const remindersMap: Map<number, any> = new Map();

export const getReminders = (): typeof remindersMap => {
  return remindersMap;
};
