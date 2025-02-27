import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
  RefObject,
} from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { AppState } from "../../store/store";

interface FloatingScrollbarProps {
  children: ReactNode;
  scrollableRef: RefObject<HTMLDivElement>;
}

const SCROLLBAR_PADDING = 32;

const FloatingScrollbar: React.FC<FloatingScrollbarProps> = ({
  children,
  scrollableRef,
}) => {
  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );

  const scrollbarRef = useRef<HTMLDivElement | null>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);

  useEffect(() => {
    if (!scrollableRef.current || !scrollbarRef.current) return;

    const container = scrollableRef.current;
    const scrollbarThumb = scrollbarRef.current;

    const handleScroll = () => {
      if (!scrollableRef.current || !scrollbarRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;

      const thumbHeight = Math.max(
        (clientHeight / scrollHeight) * clientHeight,
        40
      );

      const maxScrollTop = scrollHeight - clientHeight;
      let thumbTop = (scrollTop / maxScrollTop) * (clientHeight - thumbHeight);

      thumbTop = Math.max(thumbTop, SCROLLBAR_PADDING);
      thumbTop = Math.min(
        thumbTop,
        clientHeight - thumbHeight - SCROLLBAR_PADDING
      );

      scrollbarThumb.style.height = `${thumbHeight}px`;
      scrollbarThumb.style.transform = `translateY(${thumbTop}px)`;
      scrollbarThumb.style.opacity = "1";
      scrollbarThumb.style.pointerEvents = "auto";

      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      if (!isHovered) {
        hideTimeout.current = setTimeout(() => {
          if (scrollbarThumb) {
            scrollbarThumb.style.opacity = "0";
            scrollbarThumb.style.pointerEvents = "none";
          }
        }, 1000);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartY(e.clientY);
      setStartScrollTop(container.scrollTop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const { scrollHeight, clientHeight } = container;
      const deltaY = e.clientY - startY;
      const newScrollTop =
        startScrollTop + (deltaY / clientHeight) * scrollHeight;
      container.scrollTop = newScrollTop;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      if (scrollbarRef.current) {
        scrollbarRef.current.style.opacity = "1";
        scrollbarRef.current.style.pointerEvents = "auto";
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      if (scrollbarRef.current) {
        hideTimeout.current = setTimeout(() => {
          if (scrollbarRef.current) {
            scrollbarRef.current.style.opacity = "0";
            scrollbarRef.current.style.pointerEvents = "none";
          }
        }, 1000);
      }
    };

    scrollbarThumb.addEventListener("mousedown", handleMouseDown);
    scrollbarThumb.addEventListener("mouseenter", handleMouseEnter);
    scrollbarThumb.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("scroll", handleScroll);

    return () => {
      scrollbarThumb.removeEventListener("mousedown", handleMouseDown);
      scrollbarThumb.removeEventListener("mouseenter", handleMouseEnter);
      scrollbarThumb.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [scrollableRef, isDragging, startY, startScrollTop, isHovered]);

  return (
    <div className="relative w-full h-full">
      {children}
      {hasMicrointeractions && (
        <div
          className={twMerge(
            "absolute top-0 right-[5px] duration-150 w-2 h-full z-[9999]"
          )}
        >
          <div
            ref={scrollbarRef}
            className={twMerge(
              "absolute w-[6px] bg-dark/30 active:bg-dark/75 hover:bg-dark/75 rounded-full",
              isHovered || isDragging
                ? "outline-3 outline-dark/75"
                : "outline-0"
            )}
            style={{ opacity: 0 }}
          />
        </div>
      )}
    </div>
  );
};

export default FloatingScrollbar;
