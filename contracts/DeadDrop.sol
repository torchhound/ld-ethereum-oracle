pragma solidity 0.5.0;

interface DeadDropOracle {
    function getFeatureFlag() external view returns (bool);
}

contract DeadDrop {
    string deadDropData;
    address oracleAddress;

    constructor (address _oracleAddress, string memory _deadDropData) public {
        oracleAddress = _oracleAddress;
        deadDropData = _deadDropData;
    }

    function getDeadDropData() public view returns (string memory) {
        if(DeadDropOracle(oracleAddress).getFeatureFlag()) {
            return deadDropData;
        } else {
            return "Data unavailable";
        }
    }
}
