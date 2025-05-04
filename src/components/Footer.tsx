
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="container max-w-7xl mx-auto px-4 py-8">
      <Separator className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">Giá Vàng Việt Nam</h3>
          <p className="text-muted-foreground text-sm">
            Cập nhật giá vàng mới nhất từ các nhà cung cấp lớn nhất tại Việt Nam: SJC, DOJI, và PNJ.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Liên kết</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-muted-foreground hover:text-gold-500 transition-colors">
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-muted-foreground hover:text-gold-500 transition-colors">
                Liên hệ
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-muted-foreground hover:text-gold-500 transition-colors">
                Điều khoản sử dụng
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-muted-foreground hover:text-gold-500 transition-colors">
                Chính sách bảo mật
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Thông tin pháp lý</h3>
          <p className="text-muted-foreground text-sm">
            Trang web này cung cấp thông tin tham khảo và không đưa ra lời khuyên đầu tư. 
            Giá vàng có thể thay đổi tùy theo thời điểm và nhà cung cấp.
          </p>
        </div>
      </div>
      <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
        © {currentYear} Giá Vàng Việt Nam. Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
};

export default Footer;
