import axios from "axios";

export async function wordControl(content: string): Promise<boolean> {
  const URL = `https://sozluk.gov.tr/gts?ara=${encodeURI(content)}`;
  var { data } = await axios.get(URL);

  if (data.error) return false;
  else return true;
}
