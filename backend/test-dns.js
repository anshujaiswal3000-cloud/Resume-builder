const dns = require('dns');

// Force Node.js to use Google & Cloudflare DNS
dns.setServers(['8.8.8.8', '1.1.1.1']);

dns.resolveSrv('_mongodb._tcp.cluster0.msyxzky.mongodb.net', (err, addresses) => {
  if (err) {
    console.error('DNS SRV Resolution Failed:', err);
    return;
  }
  console.log('DNS SRV Resolution Successful! Target shards:');
  console.log(addresses);
});
