// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Prime.sol";

contract PrimeBooks is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Base64 for bytes;

    Counters.Counter private _tokenIdCounter;

    mapping(address => Book[10000]) internal authorsBooks;
    mapping(uint256 => Chapter[]) internal bookChapters;
    Book[10000] public allBooks;
    uint256 public currentBookToken = 1;
    uint256 public currentChapterToken = 1;

    struct Book {
        uint256 book_id;
        string title;
        string synopsis;
        mapping(uint256 => Chapter) chapters;
        address owner;
        string author;
        string cover;
        uint256 chapterPrice;
    }

    // struct Chapter {
    //     uint256 chapter_id;
    //     address owner;
    //     string url;
    //     bool paid;
    //     address[] sponsors;
    //     string title;
    // }

    struct Chapter {
        uint256 chapter_id;
        address owner;
        bool paid;
        address[] sponsors;
        string title;
    }

    event BookUploaded(address _user, uint256 _tokenId);
    event ChapterUploaded(address _user, string title, uint256 _tokenId);

    Prime public token;

    constructor(Prime _addr) ERC721("Upbox", "BOX") {
        token = _addr;
    }

    /**
     * @notice Uploads a new file
     * @param cover url for the cover
     */
    function uploadBook(
        string calldata title,
        string calldata synopsis,
        string calldata cover,
        string calldata author
    ) public returns (uint256) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(msg.sender, tokenId);
        Book storage newAuthorBook = authorsBooks[msg.sender][tokenId];
        Book storage newLibraryBook = allBooks[tokenId];
        newAuthorBook.book_id = tokenId;
        newAuthorBook.title = title;
        newAuthorBook.synopsis = synopsis;
        newAuthorBook.owner = msg.sender;
        newAuthorBook.cover = cover;
        newAuthorBook.author = author;
        newLibraryBook.book_id = tokenId;
        newLibraryBook.title = title;
        newLibraryBook.synopsis = synopsis;
        newLibraryBook.owner = msg.sender;
        newLibraryBook.cover = cover;
        newLibraryBook.author = author;
        emit BookUploaded(msg.sender, tokenId);
        currentBookToken = tokenId;
        return tokenId;
    }

    // /**
    //  * @notice Uploads a new file
    //  * @param url url for the chapter
    //  */
    // function uploadChapter(uint256 bookId, string calldata url, bool free, uint256 chapter, string calldata title) public returns (uint) {
    //     _tokenIdCounter.increment();
    //     uint256 tokenId = _tokenIdCounter.current();
    //     _safeMint(msg.sender, tokenId);
    //     // Chapter memory newChapter = Chapter(tokenId, msg.sender, url);
    //     Chapter memory newChapter = Chapter(tokenId, msg.sender, url, free, new address[](0), title);
    //     authorsBooks[msg.sender][bookId].chapters[chapter] = newChapter;
    //     bookChapters[bookId].push(newChapter);
    //     emit ChapterUploaded(msg.sender, allBooks[bookId].title, tokenId);
    //     currentChapterToken = tokenId;
    //     return tokenId;
    // }

    function uploadChapter(
        uint256 bookId,
        bool paid,
        uint256 chapter,
        string calldata title
    ) public returns (uint) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(msg.sender, tokenId);
        // Chapter memory newChapter = Chapter(tokenId, msg.sender, url);
        Chapter memory newChapter = Chapter(
            tokenId,
            msg.sender,
            paid,
            new address[](0),
            title
        );
        authorsBooks[msg.sender][bookId].chapters[chapter] = newChapter;
        bookChapters[bookId].push(newChapter);
        emit ChapterUploaded(msg.sender, allBooks[bookId].title, tokenId);
        currentChapterToken = tokenId;
        return tokenId;
    }

    function payForChapter(uint256 bookId, uint256 chapter) public {
        uint256 price = allBooks[bookId].chapterPrice;
        bool succes = token.sendToken(allBooks[bookId].owner, price);
        require(succes, "Tokens weren;t transfered");
        bookChapters[bookId][chapter - 1].sponsors.push(msg.sender);
    }

    function getChapterSponsors(uint256 bookId, uint256 chapter)
        public
        view
        returns (address[] memory)
    {
        address[] storage sponsors = bookChapters[bookId][chapter - 1].sponsors;
        return sponsors;
    }

    function modifyChapterPrice(uint256 newPrice, uint256 bookId) public {
        address owner = allBooks[bookId].owner;
        require(msg.sender == owner, "you don't own this book");
        allBooks[bookId].chapterPrice = newPrice;
    }

    /**
     * @notice Emergency stop contract in a case of a critical security flaw.
     */
    function destroy() public onlyOwner {
        selfdestruct(payable(owner()));
    }
}
