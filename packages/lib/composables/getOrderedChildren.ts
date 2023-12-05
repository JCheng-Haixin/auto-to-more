import { isVNode, shallowRef } from 'vue'
import { isArray } from '@vue/shared'

import type { ComponentInternalInstance, VNode } from 'vue'

const flattedChildren = (
  children: any
): any[] => {
  const vNodes = isArray(children) ? children : [children]
  const result: any[] = []

  vNodes.forEach((child) => {
    if (isArray(child)) {
      result.push(...flattedChildren(child))
    } else if (isVNode(child) && isArray(child.children)) {
      result.push(...flattedChildren(child.children))
    } else {
      result.push(child)
      if (isVNode(child) && child.component?.subTree) {
        result.push(...flattedChildren(child.component.subTree))
      }
    }
  })
  return result
}

const getOrderedChildren = <T>(
  vm: ComponentInternalInstance,
  childComponentName: string,
  children: Record<number, T>
): T[] => {
  const nodes = flattedChildren(vm.subTree).filter(
    (n): n is VNode =>
      isVNode(n) &&
      (n.type as any)?.name === childComponentName &&
      !!n.component
  )
  const uids = nodes.map((n) => n.component!.uid)
  return uids.map((uid) => children[uid]).filter((p) => !!p)
}

export const useOrderedChildren = <T extends { uid: number, to: string, hidden: boolean }>(
  vm: ComponentInternalInstance,
  childComponentName: string
) => {
  const children: Record<number, T> = {}
  const orderedChildren = shallowRef<T[]>([])

  const addChild = (child: T) => {
    children[child.uid] = child
    orderedChildren.value = getOrderedChildren(vm, childComponentName, children)
  }
  const removeChild = (uid: number) => {
    delete children[uid]
    orderedChildren.value = orderedChildren.value.filter(
      (children) => children.uid !== uid
    )
  }

  return {
    children: orderedChildren,
    addChild,
    removeChild,
  }
}