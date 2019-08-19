const Auction = artifacts.require('./web-app/src/contracts/Auction.sol')

module.exports = function (deployer) {
  deployer.deploy(Auction)
}
