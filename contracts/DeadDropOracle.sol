pragma solidity 0.5.0;

contract DeadDropOracle {
    bool featureFlag;
    address apiAddress;

    constructor (address _apiAddress, bool _featureFlag) public {
        apiAddress = _apiAddress;
        featureFlag = _featureFlag;
    }

    function setFeatureFlag(bool _featureFlag) public {
        require(msg.sender == apiAddress);
        featureFlag = _featureFlag;
    }

    function getFeatureFlag() public view returns (bool) {
        return featureFlag;
    }
}