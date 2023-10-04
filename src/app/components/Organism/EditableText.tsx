interface EditableTextProps {
  content: string,
  handleMeta?: (data: any) => void
}

export default function EditableText({ content, handleMeta }: EditableTextProps) {
  const showModal = (url: string, type: string) => {
    handleMeta && handleMeta({
      url,
      type
    })
  }

  const transformContent = (content: string) => {
    const div = document.createElement('div')
    div.innerHTML = content

    const nodes = div.childNodes
    const result = []
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i] as Element

      // 단순 텍스트인 경우
      if (node.nodeName === '#text') {
        result.push({
          type: 'text',
          content: node.textContent,
        })
        continue
      } else if (node.nodeName === 'SPAN') {
        const dataUrl = node.getAttribute('data-url')
        const dataType = node.getAttribute('data-type')
        result.push({
          type: dataType,
          url: dataUrl,
          content: node.textContent
        })
        continue
      }

      if (node.hasChildNodes()) {
        const children = node.childNodes
        const childrenArr = []
        for (let j = 0; j < children.length; j++) {
          const child = children[j] as Element

          if (child.nodeName === 'BR') {
            childrenArr.push({
              type: 'BR',
              content: '\n'
            })
          } else if (child.nodeName === '#text') {
            childrenArr.push({
              type: 'text',
              content: child.textContent + '\n',
            })
          } else if (child.nodeName === 'SPAN') {
            const dataUrl = child.getAttribute('data-url')
            const dataType = child.getAttribute('data-type')
            childrenArr.push({
              type: dataType,
              url: dataUrl,
              content: child.textContent
            })
          }
        }

        result.push({
          type: 'children',
          children: childrenArr
        })
      }
    }

    const html = result.map((item, index) => {
      if (item.type === 'children') {
        const children = item.children!
        const childrenHtml = children.map((child, index) => {
          if (child.type === 'text') {
            return (
              <span key={index}>
                {child.content}
              </span>
            )
          } else if (child.type === 'BR') {
            return (
              <div key={index}>
                <br />
              </div>
            )
          } else if (child.type === 'image' || child.type === 'video') {
            return (
              <span
                key={index}
                onClick={() => showModal(child.url!, child.type!)}
                style={{
                  display: 'inline-block',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                {child.content}
              </span>
            )
          }
        })
        return (
          <div key={index}>
            {childrenHtml}
          </div>
        )
      }
      return (
        <span key={index}>
          {item.content}
        </span>
      )
    })

    return html
  }

  return (
    <div className='editable-text'>
      <div>
        { transformContent(content) }
      </div>
    </div>
  )
}