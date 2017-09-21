import bindToGlobal from 'wc-utils/bind-to-global'

import http from './http'
import h5 from './h5'

// 字段相同, 小心覆盖
bindToGlobal(http[process.env.NODE_ENV]);
