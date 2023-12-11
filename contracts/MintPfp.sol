// SPDX-License-Identifier:MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

    contract MintPfp is ERC721Enumerable {
        string metadataURI;
        uint maxSupply;
        constructor(string memory _name,string memory _symbol,string memory _metadataURI,uint _maxSupply) ERC721(_name,_symbol){
            metadataURI = _metadataURI;
            maxSupply=_maxSupply;
            // 바깥에서 가져온것에 컨스트럭터껄 넣음 함수안에 인자는 언더바 포함
            // 매개변수로 들어가는것 언더바(_) 작성 
            // 정의해야할 내용들
        }

            function mintNFT() public {
                require(totalSupply() < maxSupply,"No more mint.");

                uint tokenId = totalSupply() +1;
                // 겹쳐지지 않게 +1 (하나씩발행) 
                _mint(msg.sender,tokenId);

                // mint NFT 함수 _mint는 인터널 함수 상속받은걸 쓰는것
            }
            // mintNFT 를 여러번 실행 for문 으로 반복문 사용 
            function batchMint(uint _amount) public{
                    for (uint i=0;i<_amount;i++){
                        mintNFT();
                    }
            }

            // tokeid에 대한 결과값 출력 
            function tokenURI(uint _tokenId)public override view returns(string memory){
                // return metadataURI + '/' + _tokenId + '.json'encodePacked 는 안에있는 함수들을 하나로 합쳐줌 .
                 return string(abi.encodePacked(metadataURI,'/',Strings.toString(_tokenId),'.json'));
                //  메타데이터 읽어오는 함수 / 연결해오는 함수.
                // abi.encodepacked 에는 스트링만 들어감.
            }
    }

    // 메타데이터가 모두 준비가 되어있으면 constructor에서 실행 
    // 메타데이터를 디플로이 후 
    // if문 사용시 의미없는 가스비 발생.

    // 민팅한 NFT 확인 토큰 아이디. 토큰URI 로 해당 토큰 아이디 입력후 메타데이터 정보알수있음
    // 내 마지막 NFT 몇개 들거있는지 balanceOf 내꺼 조회 
    // tokenofownerbyindex 최근 nft 오너의 인덱스로 조회해 tokenId 알아낼수있음.