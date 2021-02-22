import React from 'react'
import { useHistory } from "react-router-dom";

import styled from 'styled-components'


const CardWrapper = styled.div`
    width: 50%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    img {
        cursor: pointer;
        margin: 0 auto;
        width: 80%;
        height: auto;
        margin-bottom: 20px;
    }
    .card-name {
        font-size: 32px;
        text-align: center;
    }

    @media (max-width: 576px) {
        .card-name {
            font-size: 12px;
        }
    }

`

export const ListCard = React.forwardRef((props, ref) => {
    const { index, data } = props;
    const history = useHistory();

    return (
        <CardWrapper key={index} ref={ref}>
            <img src={data.imageUrl} alt="No resource" onClick={() => history.push(`/${data.address}/${data.id}`)}/>
            <span className="card-name">{data.name || 'No Name'}</span><br />
        </CardWrapper>
    )
})