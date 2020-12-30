/**
 * 2020.12.07 | gomip | created
 * 2020.12.22 | gomip | 창 최소 크기 고정
 */

const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

function createWindow() {
    /**
     * 넓이 1920, 높이 1080의 윈도우 창 생성
     */
    const win = new BrowserWindow({
        width: 1920,
        height:1080,
        minWidth: 1440,
        minHeight: 870
    })

    /**
     * ELECTRON_START_URL 값을 직정 제공할 경우 해당 값을 불러온다
     * 아닐경우, React 앱이 빌드되는 폴더의 index.html 파일을 로드
     */
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true,
    })

    /**
     * startUrl에 배정되는 url을 맨위에서 생성한 browserWindow에 실행
     */
    win.loadURL(startUrl)
}

app.on('ready', createWindow)
