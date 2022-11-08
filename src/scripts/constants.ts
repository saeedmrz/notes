export const noteSelects: NodeListOf<HTMLElement> =
  document.querySelectorAll(".selector");

export const notesBlock: HTMLElement = document.querySelector(
  ".notes"
) as HTMLElement;

export const cardInner = `
            <textarea
              type="text"
              placeholder="Computers themselves, and software yet to be developed, will revolutionize the way we learn."
            ></textarea>
            <div class="footer">
              <div class="date">
                <span>May 21, 2020</span>
              </div>
              <div class="edit">
                <button>
                <i class="fas fa-edit"></i>
                </button>
              </div>
            </div>   
          
`;

export const button: HTMLElement = document.querySelector(
  "#addNote"
) as HTMLElement;
