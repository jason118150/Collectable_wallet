import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'
import { Loading } from '../component/loading';

const DeatilWrapper = styled.div`
    span {
        font-size: 24px;
    }
    .back-button {
        position: absolute;
        cursor: pointer;
        left: 20px;
        height: 44px;
        width: 132px;
        border: 1px solid black;
        border-radius: 8px;
        font-size: 24px;
    }
    header {
        font-size: 48px;
        text-align: center;
        margin: 32px 0;
    }
    .img-container {
        display: flex;
        justify-content: center;
        img {
            width: 60%;
            height: auto;
            margin: 0 auto;
        }
    }
    .content {
        margin: 20px 10%;
        padding: 20px;
        line-height: 40px;
        text-align: left;
    }
    .permalink {
        border: 4px solid black;
        border-radius: 8px;
        width: 80%;
        padding: 20px;
        margin: 20px 10%;
        word-break: break-all;
        line-height: 24px;
    }

    @media (max-width: 576px) {
        .span {
            font-size: 12px;
        }
        .back-button {
            display: none;
        }
        header {
            padding: 20px;
        }
    }
`

export const WalletDetail = () => {
    const location = useLocation();
    const history = useHistory();
    const address = location.pathname.split('/')[1]
    const id = location.pathname.split('/')[2]
    const [detailData, setDetailData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(`https://api.opensea.io/api/v1/asset/${address}/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const tmpDetailData = {
                collectionName: data.collection.name,
                imageUrl: data.image_url,
                name: data.name,
                description: data.description,
                permalink: data.permalink,
            }
            setDetailData(tmpDetailData);
            setIsLoading(false);
        }).catch(error => {
            console.log(`Fail to fetch Github API, error message: ${error}`)
        });
    }, [address, id])
    return (
        <DeatilWrapper>
            { isLoading ? <Loading /> :
                <>
                    <button className="back-button" onClick={() => history.push('/')}>Back</button>
                    <header>{detailData && detailData.collectionName}</header>
                    <div className="img-container">
                        <img src={detailData && detailData.imageUrl} alt="No resource" />
                    </div>
                    <div className="content">
                        <span>Name: {detailData && detailData.name}</span><br />
                        <span>Description: {detailData && detailData.description}</span><br />
                    </div>
                    <div className="permalink">
                        <span>Permalink:</span><br/><span>{detailData && detailData.permalink}</span>
                    </div>
                </>
            }
        </DeatilWrapper>
    )
}