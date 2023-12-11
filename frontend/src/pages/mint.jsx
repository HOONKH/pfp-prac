import { useContext, useState } from "react";

import axios from "axios";
import { AppContext } from "../App";

const Mint = () => {
  const { contract, account } = useContext(AppContext);

  const [metadata, setMetadata] = useState();

  const onClickMint = async () => {
    try {
      if (!account || !contract) return;

      await contract.methods.mintNFT().send({
        from: account,
      });

      const balance = await contract.methods.balanceOf(account).call();
      // 현재 어카운트에 해당 토큰 개수 확인
      const newTokenId = await contract.methods
        .tokenOfOwnerByIndex(account, Number(balance) - 1)
        .call();
      // 지금 현재 내가 가지고있는 토큰의 인덱스
      const metadataURI = await contract.methods
        .tokenURI(Number(newTokenId))
        .call();

      const response = await axios.get(metadataURI);

      setMetadata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen max-w-screen-md mx-auto bg-blue-100 flex flex-col justify-center items-center">
      <div className="bg-pink-200 fixed top-0 max-w-screen-md mx-auto w-full">
        {/* 헤더 */}
      </div>
      {metadata && (
        <div>
          <img src={metadata.image} alt={metadata.name} />
        </div>
      )}
      <button onClick={onClickMint}>Mint</button>
    </div>
  );
};

export default Mint;
