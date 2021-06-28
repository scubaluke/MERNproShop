import React from 'react'
import {Helmet} from 'react-helmet'

export default function Meta({title, description, keywords}) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta  name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title:  'Welcome to ProShop',
    description: 'we sell the best products at the best prices',
    keywords: 'electronics buy electronics high quality'
}
