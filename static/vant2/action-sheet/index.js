import { VantComponent } from '../common/component'
import { button } from '../mixins/button'
import { openType } from '../mixins/open-type'
VantComponent({
  mixins: [button, openType],
  props: {
    show: Boolean,
    title: String,
    cancelText: String,
    description: String,
    round: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 100
    },
    actions: {
      type: Array,
      value: []
    },
    overlay: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    closeOnClickAction: {
      type: Boolean,
      value: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    onSelect (event) {
      console.log('选择')
      const { index } = event.currentTarget.dataset
      const item = this.data.actions[index]
      if (item && !item.disabled && !item.loading) {
        this.$emit('select', item)
        if (this.data.closeOnClickAction) {
          this.onClose()
        }
      }
    },
    onCancel () {
      console.log('onCancel')
      this.$emit('cancel')
    },
    onClose () {
      console.log('onClose')
      this.$emit('close')
    },
    onClickOverlay () {
      console.log('onClickOverlay')
      this.$emit('click-overlay')
      this.onClose()
    }
  }
})
