import copyImg from '../../assets/copy.svg';

import { ButtonCode, ButtonContainer, ButtonImg } from './styles';

type RoomCodeProps = {
    code: string;
}

export function RoomCode({ code }:RoomCodeProps) {
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(code);
    }

    return ( 
        <ButtonContainer onClick={copyRoomCodeToClipboard}>
            <div>
                <ButtonImg src={copyImg} alt="Copy Img" />
            </div>
            <ButtonCode>Sala #{code}</ButtonCode>
        </ButtonContainer>
    )
}