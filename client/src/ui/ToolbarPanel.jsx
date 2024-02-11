import styled, {css} from "styled-components"

const StyledToolbarPanel = styled.div`
    display: flex;

    ${props => props.side === 'left' && css`
        grid-column: 1;
    `}

    ${props => props.side === 'right' && css`
        grid-column: 2;
        justify-content: flex-end;
    `}
`

function ToolbarPanel({side, children}) {
    return (
        <StyledToolbarPanel side={side}>{children}</StyledToolbarPanel>
    )
}

export default ToolbarPanel
