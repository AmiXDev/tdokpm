import React from 'react'
import { Box, BasePropertyProps } from 'admin-bro'

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { record } = props

  const srcImg = record.params['thumbnailPhotoLocation']
  return (
    <Box>
      {srcImg ? (
        <img src={srcImg} width="100px" />
      ) : 'عکسی وجود ندارد.'}
    </Box>
  )
}

export default Edit 