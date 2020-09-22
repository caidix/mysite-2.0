import Cookies from "js-cookie";
import { v1 as uuidv1 } from "uuid";
const Uuid = "uuid";

export function getUuid() {
  return Cookies.get(Uuid) ? Cookies.get(Uuid) : "";
}

export function setUuid() {
  if (Cookies.get(Uuid)) return;
  const uuid = uuidv1();
  Cookies.set(Uuid, uuidv1(), { expires: 7 });
  return uuid;
}

export function removeUuid() {
  return Cookies.remove(Uuid);
}
