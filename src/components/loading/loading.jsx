import React from 'react'
import { loading } from '../../assets/images/images'
import { useTranslation } from 'react-i18next'

function Loading() {
  const { t } = useTranslation();
  return (
    <div className={"loading"}>
      <img src={ loading } alt="loading" loading='lazy' width={"100px"} height={"100px"}/>
      <h3>{t(`loading.title`)}</h3>
    </div>
  )
}

export default Loading;
