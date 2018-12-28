/* global wait */
const fs = require("fs");
module.exports = async client => {
  delete client.user.email;
  delete client.user.verified;
  try {
    const { id: rebootMsgID , channel: rebootMsgChan} = JSON.parse(fs.readFileSync('./reboot.json', 'utf8'));
    const m = await client.channels.get(rebootMsgChan).fetchMessage(rebootMsgID);
    await m.edit('Reiniciado!');
    await m.edit(`Reiniciado! (took: \`${m.editedTimestamp - m.createdTimestamp}ms\`)`);
    fs.unlink('./reboot.json', ()=>{});
  } catch(O_o){}
  await wait(1000);
  client.log("log", "Bot listo", client.user, `Listo para registrar ${client.users.size} usuarios, en ${client.channels.size} canales de ${client.guilds.size} servers :v.`);
  client.user.setGame("Jugando al vergas >:v");
  client.user.setStatus("idle");
};