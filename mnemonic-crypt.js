//benchmarking timer - https://stackoverflow.com/a/25878121
var timer = function(name) {
    var start = new Date();
    return {
        stop: function() {
            var end  = new Date();
            var time = end.getTime() - start.getTime();
            console.log(name + ':', time, 'ms');
        }
    }
};

// ---- bitcore-mnemonic
var Mnemonic = require('./index.js')

// Generate ledger mnemonic
var mnemonic = new Mnemonic(256, Mnemonic.Words.ENGLISH);
console.log(mnemonic.toString());

// Derive seed - password seeded derive
var seed = mnemonic.toSeed("password", 2048);
var seedSame = mnemonic.toSeed("password", 2048);

// Derive mnemonic twice
var encryptedMnemonic = Mnemonic.fromSeed(seed, Mnemonic.Words.ENGLISH);
console.log(encryptedMnemonic);
var encryptedMnemonicSame = Mnemonic.fromSeed(seedSame, Mnemonic.Words.ENGLISH);
console.log(encryptedMnemonicSame);

// Benchmark rounds - 2^11 = 2048 - start there
for (var i = 11; i < 128; i++) {
  var t = timer('Testing 2^' + i + ' rounds');
  var benchSeed = mnemonic.toSeed("password", 2 ** i)
  t.stop();
  // console.log("Derived: " + Mnemonic.fromSeed(seed, Mnemonic.Words.ENGLISH));
}
