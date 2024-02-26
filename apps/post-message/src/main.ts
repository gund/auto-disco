import { Disco, DiscoApi, DiscoAuth } from '@auto-disco/disco';
import assert from 'assert';

const token = process.env.TOKEN;
const serverId = process.env.SERVER_ID;
const channelId = process.env.CHANNEL_ID;
const message = process.env.MESSAGE ?? '';

assert(token, 'TOKEN env var is required');
assert(serverId, 'SERVER_ID env var is required');
assert(channelId, 'CHANNEL_ID env var is required');

const disco = new Disco({
  api: new DiscoApi({ auth: new DiscoAuth({ token }) }),
});

console.log(
  `Posting message to server ${serverId} in channel ${channelId}: ${message}`,
);

try {
  await disco.openServer(serverId).openChannel(channelId).sendMessage(message);
  console.log('Message posted!');
} catch (error) {
  console.error('Error posting message:', error);
  process.exit(1);
}
