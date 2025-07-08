const { InstanceBase, TCPHelper, runEntrypoint, Regex } = require('@companion-module/base')

class SierraAspenInstance extends InstanceBase {
  constructor(internal) {
    super(internal)
    this.tcp = null
  }

  async init(config) {
    this.config = config
    this.updateStatus('connecting', 'Connecting...')
    this.initTCP()
  }

  async destroy() {
    if (this.tcp) {
      this.tcp.destroy()
      this.tcp = null
    }
  }

  async configUpdated(config) {
    this.config = config
    if (this.tcp) {
      this.tcp.destroy()
      this.tcp = null
    }
    this.initTCP()
  }

  initTCP() {
    if (this.tcp) {
      this.tcp.destroy()
      this.tcp = null
    }
    if (this.config.host && this.config.port) {
      this.tcp = new TCPHelper(this.config.host, this.config.port)

      this.tcp.on('status_change', (status, message) => {
        this.updateStatus(status, message)
      })

      this.tcp.on('error', (err) => {
        this.log('error', 'TCP Error: ' + err.message)
      })

      this.tcp.on('connect', () => {
        this.updateStatus('ok', 'Connected')
        this.log('info', 'Connected to Sierra Aspen router')
      })

      this.tcp.on('data', (data) => {
        this.log('debug', 'Received: ' + data.toString().trim())
      })
    }
  }

  getConfigFields() {
    return [
      {
        type: 'textinput',
        id: 'host',
        label: 'Router IP Address',
        width: 6,
        default: '192.168.1.100',
        regex: Regex.IP
      },
      {
        type: 'textinput',
        id: 'port',
        label: 'TCP Port',
        width: 6,
        default: '23',
        regex: Regex.PORT
      }
    ]
  }

  getActions() {
    return {
      route: {
        name: 'Route input to output',
        options: [
          {
            type: 'number',
            label: 'Output (1-72)',
            id: 'output',
            default: 1,
            min: 1,
            max: 72,
            required: true
          },
          {
            type: 'number',
            label: 'Input (1-72)',
            id: 'input',
            default: 1,
            min: 1,
            max: 72,
            required: true
          }
        ],
        callback: async (event) => {
          if (!this.tcp) {
            this.log('error', 'Not connected to router')
            return
          }
          const output = event.options.output
          const input = event.options.input
          const cmd = `#VID ${output} ${input} !\r\n`
          this.tcp.send(cmd)
          this.log('info', `Sent: ${cmd.trim()}`)
        }
      }
    }
  }
}

runEntrypoint(SierraAspenInstance, [])