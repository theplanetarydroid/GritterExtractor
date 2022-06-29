import axios from 'axios';
import FormData from 'form-data';

export async function getUserId(username: string): Promise<number> {
  const formData = new FormData();
  formData.append('input', `@${username}`);

  const { data } = await axios({
    method: 'post',
    url: 'https://tweeterid.com/ajax.php',
    data: formData,
  });

  return data;
}
