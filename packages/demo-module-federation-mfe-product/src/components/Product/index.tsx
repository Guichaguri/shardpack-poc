import type { ReactElement } from 'react';
import { Button } from './Button';

export default function Product(): ReactElement {
  return (
    <div>
      <h1>Product</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed tincidunt odio. Nunc semper congue augue, ultrices tempus nisl venenatis maximus. Nullam sed hendrerit nulla. Aliquam sed sollicitudin turpis. Curabitur eget viverra nisi, id vulputate nibh. Cras accumsan risus in nibh semper iaculis. Nulla facilisi. Donec iaculis sollicitudin tellus, eget dapibus odio scelerisque vitae.</p>
      <p>Sed in dignissim diam. Integer eget porta orci, in imperdiet felis. Fusce mollis lobortis imperdiet. In hac habitasse platea dictumst. Suspendisse condimentum velit in magna elementum laoreet. Nunc bibendum ac quam sit amet finibus. Quisque hendrerit eget diam vel consectetur. In hac habitasse platea dictumst. Ut iaculis eu eros ac luctus. Praesent lacinia eleifend tincidunt. Morbi rhoncus malesuada euismod. Vestibulum vel fermentum libero. Sed sollicitudin, ante fringilla sollicitudin aliquam, arcu nulla suscipit dui, vitae vehicula arcu sem sit amet lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas interdum sapien augue, ac vestibulum eros lobortis sed.</p>
      <Button />
    </div>
  )
}
