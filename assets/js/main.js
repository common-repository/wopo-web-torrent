window.onload = function() {
  var client = new WebTorrent()
  var trackerList = [
      ['udp://tracker.leechers-paradise.org:6969'],
      ['udp://tracker.coppersurfer.tk:6969'],
      ['udp://tracker.opentrackr.org:1337'],
      ['udp://explodie.org:6969'],
      ['udp://tracker.empire-js.us:1337'],
      ['wss://tracker.openwebtorrent.com']
    ]

  client.on('error', function (err) {
    log('ERROR: ' + err.message,'.status',false)
  })

  if(window.location.hash) {
    torrentId = window.location.hash.substring(1)
    log('Adding ' + torrentId)
    client.add(torrentId, {"announce": trackerList}, onTorrent)
  }

  document.querySelector('#btnDownload').addEventListener('click', function (e) {    
    e.preventDefault() // Prevent page refresh
    clearAllLog()

    var torrentId = document.querySelector('input[name=torrentId]').value.trim()
    log('Adding ' + torrentId)
    client.add(torrentId, {"announce": trackerList}, onTorrent)
  })

  document.querySelector('input[name=torrentId]').addEventListener('click',function(e){
    this.select()
  })

  document.querySelector('#btnFile').addEventListener('change',function(e){
    clearAllLog()
    client.seed(this.files, {"announceList": trackerList}, onTorrent)    
  })

  function onTorrent (torrent) {
    log('Got torrent metadata!')
    log(
      'Torrent info hash: ' + torrent.infoHash + ' <br />' +
      '<a href="#' + torrent.infoHash + '" target="_blank">Share Link</a> ' +
      '<a href="' + torrent.magnetURI + '" target="_blank">Magnet URI</a> ' +
      '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">Download .torrent</a>','.info',false
    )

    // Print out progress every 3 seconds
    var interval = setInterval(function () {
      log('Progress: ' + (torrent.progress * 100).toFixed(1) + '%','.status',false)
    }, 3000)

    torrent.on('done', function () {      
      clearInterval(interval)
      log('File done. Seeding...','.status',false)
    })

    // Render all files into to the page
    torrent.files.forEach(function (file) {
      file.appendTo('.log')
      file.getBlobURL(function (err, url) {
        if (err) return log(err.message)
        log('File done. Seeding...','.status',false)
        log('<a href="' + url + '" target="_blank" download="' + file.name + '">Download full file: ' + file.name + '</a>','.files')
      })
    })
  }

  function log (str, selector='.log', append=true) {    
    if (append){
      var p = document.createElement('p')
      p.innerHTML = str
      document.querySelector(selector).appendChild(p)      
    }else{
      document.querySelector(selector).innerHTML = str;
    }
    
  }

  function clearAllLog(){
    log('','.log',false)
    log('','.status',false)
    log('','.info',false)
    log('','.files',false)
  }
};