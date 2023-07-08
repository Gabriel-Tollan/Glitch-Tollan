import twilio from "twilio";
import { options } from "./options.js";

const twilioAccount = options.twilio.twilioId;
const twilioToken = options.twilio.twilioPhone;

export const twilioPhone = options.twilio.twilioPhone;

export const twilioClient = twilio(twilioAccount,twilioToken);