const cases = [];

const baseline = 'Bản nháp AI';
const separate = 'Bản nháp gộp nhiều trạng thái và màn hình vào một dòng.';
const missing = 'Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng.';
const specific = 'Bản nháp thiếu điều kiện kích hoạt và phản hồi đo được.';

function add(ia, source, screen, fixture, steps, expected, run, gap = '') {
  const id = 'GUI-' + String(cases.length + 1).padStart(3, '0');
  cases.push({ id, ia, source, screen, fixture, steps, expected, origin: gap ? 'AI bổ sung' : baseline, gap, run });
}

const h = 'Trang chủ';
const d = 'Chi tiết sản phẩm';
const c = 'Giỏ hàng';
const k = 'Checkout';
const n = 'Navbar khách';
const oneH1 = async ({ page }) => {
  const names = await page.locator('h1').allTextContents();
  return [names.length === 1 && names[0].trim().length > 0, names];
};
const blue = (value) => {
  const [red, green, channel] = value.match(/\d+/g)?.map(Number) ?? [];
  return channel > red + 20 && channel > green + 15;
};
const red = (value) => {
  const [channel, green, other] = value.match(/\d+/g)?.map(Number) ?? [];
  return channel > green + 35 && channel > other + 35;
};
const thousands = /\d{1,3}(?:[.,\u00a0\u202f ]\d{3})+\s*₫/u;
const priceValue = (text) => Number(text.replace(/[^\d-]/g, ''));
const exists = async (loc) => [(await loc.count()) > 0, { matches: await loc.count() }];
const visibleText = async (loc) => [await loc.isVisible(), await loc.allTextContents()];
const breadcrumb = async ({ page }) => {
  const nav = page.locator('main').locator('nav, [role=navigation], [aria-label*=breadcrumb i], [aria-label*="đường dẫn" i], .breadcrumb');
  const candidate = await nav.allTextContents();
  return [candidate.some((text) => /trang chủ|eshop/i.test(text)), { navigation: candidate }];
};
const inputAccessibleName = async (loc) => loc.ariaSnapshot();

add('IA-01','FR-21; FR-05',h,'home','Đếm h1 sau khi catalog tải xong.','Đúng một h1 mô tả danh sách sản phẩm.',oneH1);
add('IA-01','FR-21',d,'detail','Đếm h1 khi mở sản phẩm seed.','Đúng một h1 mô tả sản phẩm.',oneH1,separate);
add('IA-01','FR-21',c,'cart','Đếm h1 trong giỏ có một dòng.','Đúng một h1 mô tả giỏ hàng.',oneH1,separate);
add('IA-01','FR-21',k,'checkout','Đếm h1 khi xác nhận đơn có sản phẩm.','Đúng một h1 mô tả nội dung Checkout.',oneH1,separate);
add('IA-01','FR-21; FR-05',h,'home','Đọc giá của toàn bộ thẻ sản phẩm seed.','Tất cả giá có dấu phân cách hàng nghìn và ký hiệu ₫.',async ({ page }) => {
  const prices = await page.locator('main .grid p').allTextContents();
  return [prices.length === 5 && prices.every((text) => thousands.test(text)), prices];
});
add('IA-01','FR-21',d,'detail','Đọc giá của sản phẩm seed.','Giá có dấu phân cách hàng nghìn và ký hiệu ₫.',async ({ page }) => {
  const price = await page.locator('main p').first().innerText();
  return [thousands.test(price), price];
},separate);
add('IA-01','FR-21',c,'cart','Đọc đơn giá và thành tiền của dòng giỏ.','Cả hai dùng ký hiệu ₫ và phân cách hàng nghìn.',async ({ page }) => {
  const cells = page.locator('tbody td');
  const prices = [await cells.nth(1).innerText(), await cells.nth(3).innerText()];
  return [prices.every((text) => thousands.test(text)), prices];
},separate);
add('IA-01','FR-21',k,'checkout','Đọc chuỗi tổng thanh toán cuối form.','Tổng có dấu phân cách hàng nghìn và ký hiệu ₫.',async ({ total }) => {
  const text = await total().innerText();
  return [thousands.test(text), text];
},separate);
add('IA-01','FR-21',h,'home','Đọc màu nền tính toán của nút Tìm.','Nút submit tìm kiếm có màu xanh dương.',async ({ page, bg }) => {
  const color = await bg(page.getByRole('button',{name:'Tìm',exact:true}));
  return [blue(color),color];
},separate);
add('IA-01','FR-21',d,'detail','Đọc màu nền nút Thêm vào giỏ hàng.','Nút mua hàng có màu xanh dương.',async ({ detailAdd, bg }) => {
  const color = await bg(detailAdd()); return [blue(color),color];
});
add('IA-01','FR-21',c,'cart','Đọc màu chữ và nền của nút Xóa.','Hành động xóa có màu đỏ ở chữ hoặc nền.',async ({ page, bg }) => {
  const button = page.locator('tbody button').first();
  const colors = [await bg(button), await button.evaluate((el) => getComputedStyle(el).color)];
  return [colors.some(red), colors];
});
add('IA-01','FR-21',k,'checkout','Đọc màu nền nút xác nhận thanh toán.','Nút mua hàng có màu xanh dương.',async ({ pay,bg }) => {
  const color = await bg(pay()); return [blue(color), color];
},separate);
add('IA-01','FR-21',k,'checkout','Đọc màu nền nút Áp dụng sau khi nhập mã.','Nút submit mã giảm giá có màu xanh dương.',async ({ coupon,apply,bg }) => {
  await coupon().fill('BIGBUY');
  const color = await bg(apply()); return [blue(color), color];
},separate);
add('IA-01','FR-21',h,'home','Đặt focus vào ô tìm kiếm rồi bấm Tab.','Focus chuyển tới nút Tìm liền sau ô.',async ({ page, search }) => {
  await search().focus(); await page.keyboard.press('Tab');
  const actual = await page.locator(':focus').innerText();
  return [actual.trim() === 'Tìm', actual];
});
add('IA-01','FR-21',k,'checkout','Điền mã hợp lệ về cú pháp. Tab từ ô mã qua Áp dụng rồi Xác Nhận Thanh Toán.','Focus lần lượt đi qua hai nút đúng thứ tự.',async ({ page,coupon }) => {
  await coupon().fill('BIGBUY'); await coupon().focus();
  const seen = [];
  for (let i = 0; i < 2; i++) {
    await page.keyboard.press('Tab'); seen.push(await page.locator(':focus').innerText());
  }
  return [seen[0] === 'Áp dụng' && /Xác Nhận Thanh Toán/i.test(seen[1]), seen];
},separate);

add('IA-02','FR-06',d,'detail','Đọc kiểu và giá trị mặc định của ô số lượng.','Ô số lượng hỗ trợ nhập số và mặc định 1.',async ({ qty }) => {
  const actual = { type: await qty().getAttribute('type'), value: await qty().inputValue() };
  return [actual.type === 'number' && actual.value === '1',actual];
},missing);
for (const [value, label] of [['0','số 0'],['-1','số âm'],['1.5','số thập phân'],['','giá trị rỗng']]) {
  add('IA-02','FR-06',d,'detail','Nhập ' + label + '. Bấm Thêm vào giỏ tối đa hai lần vì lượt đầu có thể bị bỏ qua. Kiểm tra giỏ.', 'Sản phẩm không được thêm với ' + label + '.', async ({ page,qty,detailAdd,openCart }) => {
    await qty().fill(value);
    for (let attempt = 0; attempt < 2 && await detailAdd().innerText() !== 'Đã thêm'; attempt++) {
      await detailAdd().click();
    }
    const feedback = await detailAdd().innerText();
    await openCart();
    const rows = await page.locator('tbody tr').allTextContents();
    return [rows.length === 0,{ value, feedback, rows }];
  },separate);
}
add('IA-02','FR-08',k,'checkout','Kiểm tra khả năng sửa ô tổng tiền trước khi gửi đơn.','Tổng tiền được tính từ giỏ và người dùng không thể sửa trực tiếp.',async ({ page }) => {
  const total = page.locator('main input[type=number]');
  const before = await total.inputValue();
  const editable = await total.isEditable();
  if (editable) await total.fill('1');
  return [!editable, { editable, before, after: await total.inputValue() }];
});
add('IA-02','FR-22',k,'checkout','Áp dụng mã không tồn tại. So sánh vị trí thông báo với nút Áp dụng.','Lỗi của ô mã được đặt phía trên nút Áp dụng.',async ({ page,tryCoupon,apply }) => {
  await tryCoupon('HW03NOTACODE');
  const message = page.getByText(/Mã giảm giá không tồn tại/);
  const [errorBox, submit] = await Promise.all([message.boundingBox(), apply().boundingBox()]);
  return [Boolean(errorBox && submit && errorBox.y + errorBox.height <= submit.y), {
    text: await message.allTextContents(), errorY: errorBox?.y, buttonY: submit?.y,
  }];
});
add('IA-02','FR-09',k,'checkout','Quan sát nút Áp dụng khi ô mã trống.','Nút Áp dụng bị vô hiệu khi mã trống.',async ({ apply }) => {
  const disabled = await apply().isDisabled(); return [disabled,{disabled}];
},specific);
add('IA-02','FR-09',k,'checkout','Nhập chỉ dấu cách vào ô mã.','Nút Áp dụng vẫn bị vô hiệu khi không có mã thực.',async ({ coupon,apply }) => {
  await coupon().fill('   ');
  const disabled = await apply().isDisabled(); return [disabled,{disabled}];
},specific);
add('IA-02','FR-08; FR-09',k,'checkout','Để ô mã trống và kiểm tra nút xác nhận.','Mã là tùy chọn. Nút xác nhận thanh toán vẫn khả dụng.',async ({ pay }) => {
  const enabled = await pay().isEnabled(); return [enabled,{enabled}];
},missing);
add('IA-02','FR-22',d,'detail','Đối chiếu tên nhãn số lượng được công bố cho điều khiển.','Tên số lượng được liên kết với ô nhập.',async ({ qty }) => {
  const snapshot = await inputAccessibleName(qty());
  return [/spinbutton\s+"[^"]*Số lượng/i.test(snapshot), snapshot];
},'Bản nháp chưa xét cách công bố nhãn cho công nghệ hỗ trợ. Tiêu chí bổ sung về khả năng truy cập.');
add('IA-02','FR-22',k,'checkout','Đối chiếu tên nhãn mã giảm giá được công bố cho điều khiển.','Ô nhập có tên truy cập mô tả mã giảm giá.',async ({ coupon }) => {
  const snapshot = await inputAccessibleName(coupon());
  return [/textbox\s+"[^"]*(mã giảm giá)/i.test(snapshot),snapshot];
},'Bản nháp chưa xét tên truy cập của điều khiển. Tiêu chí bổ sung về khả năng truy cập.');

add('IA-03','FR-23',n,'home','Bấm link Giỏ hàng khi chưa đăng nhập.','Link dẫn tới /cart.',async ({ page,openCart }) => {
  await openCart(); return [new URL(page.url()).pathname === '/cart', page.url()];
});
for (const [label, route] of [['Đăng nhập','/login'],['Đăng ký','/register']]) {
  add('IA-03','FR-23',n,'home','Kiểm tra đích link ' + label + ' khi chưa đăng nhập.','Link trỏ đến ' + route + '.',async ({ page }) => {
    const href = await page.locator('header nav').getByRole('link',{name:label,exact:true}).getAttribute('href');
    return [href === route,href];
  },separate);
}
add('IA-03','FR-23',n,'cart','Quan sát trạng thái link Giỏ hàng ở /cart.','Navbar có dấu hiệu phân biệt link đang được chọn.',async ({ page }) => {
  const link = page.locator('header nav').getByRole('link',{name:/Giỏ hàng/});
  const actual = { current: await link.getAttribute('aria-current'), classes: await link.getAttribute('class') };
  return [actual.current === 'page' || /(?:^|\s)active(?:\s|$)/.test(actual.classes ?? ''),actual];
});
add('IA-03','FR-23',n,'cart','Thêm một sản phẩm và đọc nội dung link Giỏ hàng.','Link hiển thị badge số lượng 1.',async ({ page }) => {
  const text = await page.locator('header nav').getByRole('link',{name:/Giỏ hàng/}).innerText();
  return [/\b1\b/.test(text),text];
});
add('IA-03','FR-23',d,'detail','Tìm đường dẫn phân cấp trong nội dung Chi tiết.','Có breadcrumb thể hiện đường dẫn từ Trang chủ.',breadcrumb,separate);
add('IA-03','FR-23',c,'cart','Tìm đường dẫn phân cấp trong Giỏ hàng có sản phẩm.','Có breadcrumb thể hiện đường dẫn từ Trang chủ.',breadcrumb,separate);
add('IA-03','FR-23',k,'checkout','Tìm đường dẫn phân cấp trong Checkout có sản phẩm.','Có breadcrumb thể hiện đường dẫn từ Trang chủ.',breadcrumb,separate);
add('IA-03','FR-07',c,'empty','Bấm Tiếp tục mua sắm từ giỏ trống.','Trở về Trang chủ và danh sách sản phẩm tải được.',async ({ page,homeReady }) => {
  await page.getByRole('link',{name:'Tiếp tục mua sắm'}).click(); await homeReady();
  return [new URL(page.url()).pathname === '/', page.url()];
},missing);
add('IA-03','FR-07',c,'cart','Đọc nhãn và đích link mua tiếp trong giỏ có sản phẩm.','Link về / có nhãn Tiếp tục mua sắm.',async ({ page }) => {
  const link = page.locator('main').getByRole('link',{name:/mua/i}).first();
  const actual = { label: await link.innerText(), href: await link.getAttribute('href') };
  return [actual.href === '/' && actual.label.trim() === 'Tiếp tục mua sắm',actual];
},missing);
add('IA-03','FR-08',c,'cart','Bấm Tiến hành thanh toán khi là khách. Ghi dialog nếu có.','Khách được đưa tới đăng nhập trước khi thanh toán.',async ({ page, proceed }) => {
  let message;
  page.once('dialog', async (dialog) => { message = dialog.message(); await dialog.accept(); });
  await proceed().click(); await page.waitForURL('**/login');
  return [new URL(page.url()).pathname === '/login',{ url: page.url(), message }];
},missing);
add('IA-03','FR-08',k,'guestCheckout','Mở trực tiếp /checkout khi chưa đăng nhập.','Khách không truy cập được form xác nhận thanh toán đang hoạt động.',async ({ page,pay }) => {
  const payVisible = await pay().isVisible();
  return [!payVisible,{ url: page.url(), payVisible }];
},'Bản nháp chỉ xét đường đi qua nút giỏ, thiếu truy cập URL trực tiếp.');

add('IA-04','FR-05; FR-24',h,'home','Đọc alt của toàn bộ ảnh sản phẩm.','Mỗi ảnh có alt mô tả sản phẩm tương ứng.',async ({ page }) => {
  const cards = await page.locator('main .grid > div').evaluateAll((els) => els.map((el) => ({
    product: el.querySelector('h2').textContent, alt: el.querySelector('img').getAttribute('alt'),
  })));
  return [cards.length === 5 && cards.every(({product,alt}) => alt?.includes(product)),cards];
});
add('IA-04','FR-24',d,'detail','Đọc alt ảnh lớn ở trang chi tiết.','Alt mô tả sản phẩm đang mở.',async ({ page,product }) => {
  const alt = await page.locator('main img').getAttribute('alt');
  return [Boolean(alt?.includes(product)),alt];
},separate);
add('IA-04','FR-05',h,'home','Tìm chuỗi HW03NOITEM2026 và chờ API trả 0 kết quả.','Trang hiện thông báo không có kết quả.',async ({ page,doSearch }) => {
  await doSearch('HW03NOITEM2026');
  const body = await page.locator('main').innerText();
  return [/không (?:tìm thấy|có kết quả|có sản phẩm)/i.test(body),body];
},specific);
add('IA-04','FR-05',h,'blank','Giữ request catalog ở trạng thái đang chờ rồi đọc UI.','Trang chủ có phản hồi đang tải trước khi sản phẩm xuất hiện.',async ({ page,pending }) => {
  return pending('**/api/products?search=', '/', async () => {
    const body = await page.locator('main').innerText();
    return [/đang tải|loading/i.test(body),body];
  });
},specific);
add('IA-04','FR-05',h,'home','Tìm từ iPhone và đọc danh sách sau phản hồi.','Chỉ có sản phẩm khớp từ khóa.',async ({ page,doSearch,product }) => {
  await doSearch('iPhone');
  const names = await page.locator('main h2').allTextContents();
  return [names.length === 1 && names[0] === product,names];
},missing);
add('IA-04','FR-05',h,'home','Nhập và tìm chuỗi thử vô hại <b>HW03</b>. Kiểm tra vùng hiển thị từ khóa.','Chuỗi được hiển thị như văn bản, không tạo thẻ HTML từ đầu vào.',async ({ page,doSearch }) => {
  await doSearch('<b>HW03</b>');
  const rendered = await page.locator('main b').allTextContents();
  const body = await page.locator('main').innerText();
  return [rendered.length === 0 && body.includes('<b>HW03</b>'),{ rendered, body }];
},'Bản nháp thiếu phép thử chuỗi chứa markup theo yêu cầu hiển thị an toàn.');
add('IA-04','FR-06',d,'detail','Đọc tiêu đề, ảnh, mô tả và giá của sản phẩm seed.','Bốn thông tin sản phẩm hiển thị đúng theo fixture.',async ({ page,product }) => {
  const title = await page.locator('main h1').innerText();
  const img = await page.locator('main img').getAttribute('src');
  const body = await page.locator('main').innerText();
  return [title === product && Boolean(img) && body.includes('Điện thoại cao cấp của Apple') && /30[., ]000[., ]000/u.test(body), {title,img,body}];
},missing);
add('IA-04','FR-06',d,'detail','Tìm danh mục của sản phẩm iPhone trên trang chi tiết.','Trang hiển thị danh mục Điện thoại của sản phẩm.',async ({ page }) => {
  const category = await page.getByText(/^(Danh mục:\s*)?Điện thoại$/i).allTextContents();
  return [category.length > 0,category];
},missing);
add('IA-04','FR-06; FR-24',d,'detail','Bấm Thêm vào giỏ một lần, đọc phản hồi rồi mở giỏ.','Một lần bấm có phản hồi và thêm một dòng số lượng 1.',async ({ page,detailAdd,openCart }) => {
  await detailAdd().click();
  const feedback = await detailAdd().innerText();
  await openCart();
  const rows = await page.locator('tbody tr').allTextContents();
  return [/Đã thêm/.test(feedback) && rows.length === 1,{feedback,rows}];
});
add('IA-04','FR-24',h,'home','Bấm Thêm vào giỏ trên một thẻ, quan sát navbar và thông báo.','Có toast, đổi nhãn nút hoặc badge tăng.',async ({ page,addHome }) => {
  const before = await page.locator('header nav').innerText();
  await addHome();
  const after = await page.locator('header nav').innerText();
  const notices = await page.getByText(/Đã thêm|thêm thành công/i).allTextContents();
  return [after !== before || notices.length > 0,{before,after,notices}];
},separate);
add('IA-04','FR-07',c,'cart','Đọc tiêu đề các cột của giỏ có hàng.','Có Sản phẩm, Đơn giá, Số lượng, Thành tiền và Thao tác.',async ({ page }) => {
  const actual = await page.locator('thead th').allTextContents();
  return [JSON.stringify(actual) === JSON.stringify(['Sản phẩm','Đơn giá','Số lượng','Thành tiền','Thao tác']),actual];
},missing);
add('IA-04','FR-07',c,'cart','Kiểm tra có nút tăng và giảm số lượng tại dòng sản phẩm.','Dòng giỏ cung cấp cả nút + và nút -.',async ({ page }) => {
  const controls = await page.locator('tbody tr').first().getByRole('button').allTextContents();
  return [controls.some((t) => t.trim() === '+') && controls.some((t) => /^[−-]$/.test(t.trim())),controls];
},missing);
add('IA-04','FR-07',c,'cart','Thêm cùng iPhone lần nữa từ Trang chủ rồi trở lại Giỏ hàng.','Chỉ một dòng cho iPhone và số lượng bằng 2.',async ({ page,homeReady,addHome,openCart }) => {
  await page.locator('header').getByRole('link',{name:'EShop'}).click();
  await homeReady(); await addHome(); await openCart();
  const rows = await page.locator('tbody tr').allTextContents();
  const quantities = await page.locator('tbody tr td:nth-child(3)').allTextContents();
  return [rows.length === 1 && quantities[0] === '2',{rows,quantities}];
},missing);
add('IA-04','FR-07',c,'cart','Đọc nhãn của dòng tổng giỏ.','Nhãn tổng tiền là Tổng cộng.',async ({ page }) => {
  const actual = await page.locator('main').innerText();
  return [/Tổng cộng/.test(actual),actual];
},missing);
add('IA-04','FR-07; FR-24',c,'cart','Bấm Xóa và hủy nếu dialog xuất hiện. Kiểm tra dòng giỏ.','Hiện xác nhận trước khi xóa và hủy giữ dòng trong giỏ.',async ({ page }) => {
  let dialogMessage;
  page.once('dialog', async (dialog) => { dialogMessage = dialog.message(); await dialog.dismiss(); });
  await page.locator('tbody').getByRole('button',{name:/Xóa/}).click();
  const custom = await page.getByRole('dialog').count();
  const rows = await page.locator('tbody tr').count();
  return [Boolean(dialogMessage || custom) && rows === 1,{dialogMessage,custom,rows}];
});
add('IA-04','FR-07; FR-24',c,'empty','Mở Giỏ hàng với browser context mới. Đọc thông báo rỗng.','Giỏ trống có thông báo rõ ràng.',async ({ page }) => visibleText(page.getByText('Giỏ hàng của bạn đang trống')));
add('IA-04','FR-07; FR-24',c,'empty','Kiểm tra minh họa trong vùng Giỏ hàng trống.','Có hình minh họa hoặc icon đi kèm thông báo.',async ({ page }) => exists(page.locator('main img, main svg, main [role=img]')),separate);
add('IA-04','FR-08',k,'checkout','Đọc danh sách hàng trên Checkout với giỏ một sản phẩm.','Có tên iPhone và số lượng 1.',async ({ page,product }) => {
  const rows = await page.locator('main li').allTextContents();
  return [rows.length === 1 && rows[0].includes(product) && /x 1\b/.test(rows[0]),rows];
},missing);
add('IA-04','FR-08',k,'checkout','Đối chiếu tổng mặc định với giá iPhone trong giỏ một sản phẩm.','Tổng chưa giảm là 30.000.000 đồng.',async ({ total }) => {
  const text = await total().innerText(); return [priceValue(text) === 30000000,text];
},missing);
add('IA-04','FR-09',k,'checkout','Áp dụng mã không tồn tại và chờ phản hồi.','Có thông báo mã không tồn tại và không hiện khoản giảm.',async ({ page,tryCoupon }) => {
  await tryCoupon('HW03NOTACODE');
  const body = await page.locator('main').innerText();
  return [/không tồn tại/i.test(body) && !body.includes('Tiết kiệm:'),body];
},specific);
add('IA-04','FR-09 C2',k,'checkout','Áp dụng EXPIRED ở tổng 30.000.000 đồng.','Có thông báo hết hạn và không hiện khoản giảm.',async ({ page,tryCoupon }) => {
  await tryCoupon('EXPIRED');
  const body = await page.locator('main').innerText();
  return [/đã hết hạn/i.test(body) && !body.includes('Tiết kiệm:'),body];
},missing);
add('IA-04','FR-09',k,'checkout','Áp dụng BIGBUY trên giỏ một iPhone.','Hiện giảm 50.000 và tổng 29.950.000 đồng.',async ({ page,tryCoupon,total }) => {
  await tryCoupon('BIGBUY');
  const body = await page.locator('main').innerText();
  return [/Tiết kiệm:\s*50[., ]000/u.test(body) && priceValue(await total().innerText()) === 29950000,body];
},missing);
add('IA-04','FR-09',k,'checkout','Áp dụng SAVE10 trên giỏ một iPhone.','Hiện giảm 3.000.000 và tổng 27.000.000 đồng.',async ({ page,tryCoupon,total }) => {
  await tryCoupon('SAVE10');
  const body = await page.locator('main').innerText();
  return [/Tiết kiệm:\s*3[., ]000[., ]000/u.test(body) && priceValue(await total().innerText()) === 27000000,body];
},missing);
add('IA-04','FR-09',k,'checkout','Áp dụng BIGBUY, sau đó sửa ô mã sang chuỗi khác.','Khoản giảm trước đó biến mất và tổng về 30.000.000 đồng.',async ({ page,tryCoupon,coupon,total }) => {
  await tryCoupon('BIGBUY'); await coupon().fill('HW03NEW');
  const body = await page.locator('main').innerText();
  return [!body.includes('Tiết kiệm:') && priceValue(await total().innerText()) === 30000000,body];
},'Bản nháp chưa xét chuyển trạng thái sau khi người dùng sửa dữ liệu.');
add('IA-04','FR-08',k,'checkout','Giữ request thanh toán đang chờ và kiểm tra nút xác nhận.','Nút vô hiệu và hiện Đang xử lý trong khi request chưa xong.',async ({ page,pay,pending }) => {
  return pending('**/api/checkout', () => pay().click(), async () => {
    const btn = page.getByRole('button',{name:/Đang xử lý/});
    const visible = await btn.isVisible();
    return [visible && await btn.isDisabled(),{visible, button:await btn.allTextContents()}];
  });
},specific);
add('IA-04','FR-08',k,'checkout','Xác nhận một đơn demo không coupon và đọc màn thành công.','Hiện thông báo Thanh toán thành công.',async ({ page,submit }) => {
  const status = await submit();
  const message = await page.getByText('Thanh toán thành công!').allTextContents();
  return [status === 200 && message.length === 1,{status,message}];
},specific);
add('IA-04','FR-08',k,'checkout','Xác nhận đơn demo rồi mở Giỏ hàng bằng navbar.','Sau khi thanh toán thành công, Giỏ hàng trống.',async ({ page,submit,openCart }) => {
  const status = await submit(); await openCart();
  const rows = await page.locator('tbody tr').count();
  const body = await page.locator('main').innerText();
  return [status === 200 && rows === 0 && /đang trống/.test(body),{status,rows,body}];
},missing);
add('IA-04','FR-08',k,'checkout','Sau thành công bấm Quay lại trang chủ.','Trở về Trang chủ và danh sách tải được.',async ({ page,submit,homeReady }) => {
  const status = await submit(); await page.getByRole('button',{name:'Quay lại trang chủ'}).click(); await homeReady();
  return [status === 200 && new URL(page.url()).pathname === '/', {status,url:page.url()}];
},specific);

export { cases };
