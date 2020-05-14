import { hypheniphyDate } from "./helpers/humanizeDelta.ts";
import { getReminders } from "./commands/lib/remind/getReminders.ts";
import { sendMessage } from "./helpers/sendMessage.ts";
import { removeReminder } from "./commands/lib/remind/removeReminder.ts";
import { vd } from "./commands/lib/vd/index.ts";

let vdSent = false;
export const checkIfSomethingToSend = async () => {
    
  const currentDate = hypheniphyDate(new Date());

  // check reminders
  const reminders = await getReminders();
  reminders.forEach((reminder) => {
    if (reminder.time === currentDate) {
      sendMessage(reminder.channel, reminder.message);
      removeReminder(reminder.id);
    }
  });

  // check if we need to post !vd
  
  const dateEnd = currentDate.slice(7) // 8:00:00 and 18:00:00

  if (dateEnd === '8-00-00') {
      if (!vdSent) {
          vd()
          vdSent = true;

          setTimeout(() => {
              vdSent = false
          }, 1000)
      }
  }

};
