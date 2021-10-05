pragma solidity ^0.5.0;

contract DStorage {
    string public name = "DStorage";

    mapping(uint256 => File) public files;

    struct File {
        uint256 fileId;
        string fileHash;
        uint256 fileSize;
        string fileType;
        string fileName;
        string fileDescription;
        uint256 uploadTime;
        address payable uploader;
    }

    // Event

    constructor() public {}

    // Upload File function

    // Make sure the file hash exists

    // Make sure file type exists

    // Make sure file description exists

    // Make sure file fileName exists

    // Make sure uploader address exists

    // Make sure file size is more than 0

    // Increment file id

    // Add File to the contract

    // Trigger an event
}
