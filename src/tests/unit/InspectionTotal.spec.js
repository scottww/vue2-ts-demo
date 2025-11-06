import { shallowMount } from '@vue/test-utils'
import InspectionTotal from '../../views/test/InspectionTotal.vue'

describe('InspectionTotal.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(InspectionTotal, {
      propsData: {
        inspectionsTotal: 10,
        maintenanceTotal: 5,
        todayInspection: 2,
        todayMaintenance: 1
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders correct title', () => {
    expect(wrapper.find('.inspection-title').text()).toBe('巡查养护')
  })

  it('renders inspectionsTotal correctly', () => {
    expect(wrapper.findAll('.text-item .number').at(0).text()).toBe('10')
  })

  it('renders maintenanceTotal correctly', () => {
    expect(wrapper.findAll('.text-item .number').at(1).text()).toBe('5')
  })

  it('renders todayInspection correctly', () => {
    expect(wrapper.findAll('.text-item .number').at(2).text()).toBe('2')
  })

  it('renders todayMaintenance correctly', () => {
    expect(wrapper.findAll('.text-item .number').at(3).text()).toBe('1')
  })

  it('formatterValue returns placeholder for null/undefined/empty', () => {
    expect(wrapper.vm.formatterValue(null)).toBe('--')
    expect(wrapper.vm.formatterValue(undefined)).toBe('--')
    expect(wrapper.vm.formatterValue('')).toBe('--')
    expect(wrapper.vm.formatterValue(0)).toBe(0) // 0 不算空
    expect(wrapper.vm.formatterValue('100')).toBe('100')
  })

  it('formatterValue returns value if not null/undefined/empty', () => {
    expect(wrapper.vm.formatterValue(123)).toBe(123)
    expect(wrapper.vm.formatterValue('abc')).toBe('abc')
  })
})
