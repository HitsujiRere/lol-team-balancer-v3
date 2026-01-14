import {
  Button,
  cn,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  NumberInput,
} from "@heroui/react";
import { DicesIcon, GripVerticalIcon } from "lucide-react";

const SummonerCard = ({
  name,
  team,
}: {
  name: string;
  team: "blue" | "red";
}) => {
  return (
    <div
      className={cn(
        "box-border grid gap-2 rounded-medium border-medium bg-background px-4 py-2",
        team === "blue"
          ? "col-start-1 border-blue-400"
          : "col-start-3 border-red-400",
      )}
    >
      <div className="flex items-center gap-4">
        <Button size="sm" variant="light" isIconOnly>
          <GripVerticalIcon />
        </Button>
        <div>{name}</div>
      </div>
      <div className="flex gap-4">
        <NumberInput
          aria-label="level"
          defaultValue={123}
          className="max-w-32"
          startContent={<span>Lv.</span>}
        />
        <Input aria-label="rank" defaultValue="GOLD_I" className="max-w-32" />
      </div>
    </div>
  );
};

export const GroupEditor = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      <ModalContent>
        <ModalHeader>チームエディター</ModalHeader>
        <ModalBody className="pb-4">
          <div className="flex gap-4">
            <Button color="primary" startContent={<DicesIcon />}>
              チーム分け
            </Button>
          </div>
          <div className="grid grid-flow-row-dense grid-cols-[2fr_1fr_2fr] gap-4">
            <div className="box-border grid place-items-center gap-2 rounded-medium border-blue-400 border-medium bg-blue-200 px-4 py-2">
              <div className="text-lg">ブルーチーム</div>
              <div className="flex items-center gap-8">
                <div>平均: GOLD_I</div>
                <Button variant="faded">メンバーコピー</Button>
              </div>
            </div>
            <div className="box-border grid place-items-center rounded-medium border-default-300 border-medium bg-default-100 px-4 py-2">
              <Button variant="faded">メンバーコピー</Button>
            </div>
            <div className="box-border grid place-items-center rounded-medium border-medium border-red-400 bg-red-200 px-4 py-2">
              <div className="text-lg">レッドチーム</div>
              <div className="flex items-center gap-8">
                <div>平均:0pt GOLD_II</div>
                <Button variant="faded">コピー</Button>
              </div>
            </div>
            {["TOP", "JG", "MID", "BOT", "SUP"].map((position) => (
              <div
                key={position}
                className="col-start-2 box-border grid place-items-center rounded-medium border-default border-medium bg-background px-4 py-2"
              >
                {position}
              </div>
            ))}
            <SummonerCard name="りんご #JP1" team="blue" />
            <SummonerCard name="バナナ #JP1" team="blue" />
            <SummonerCard name="ぶどう #JP1" team="blue" />
            <SummonerCard name="いちご #JP1" team="blue" />
            <SummonerCard name="みかん #JP1" team="blue" />
            <SummonerCard name="スイカ #JP1" team="red" />
            <SummonerCard name="パイナップル #JP1" team="red" />
            <SummonerCard name="さくらんぼ #JP1" team="red" />
            <SummonerCard name="マンゴー #JP1" team="red" />
            <SummonerCard name="キウイ #JP1" team="red" />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
