import copyRight from '../../assets/images/copy.svg';

import '../../styles/roomCode.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode({code} :RoomCodeProps) {
  function copyCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button onClick={copyCodeToClipboard} className="room-code">
      <div>
      <img src={copyRight} alt="Copy room code" />
      </div>
      <span>Sala # {code}</span>
    </button>
  );
}
